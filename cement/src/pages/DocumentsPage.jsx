import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight, Download, Eye, FileArchive, FileText, Plus, Search, Shield, Trash2, Upload, X } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';

const MAX_FILE_BYTES = 1024 * 1024;
const MAX_ARCHIVE_BYTES = 2 * 1024 * 1024;
const formatBytes = (bytes = 0) => {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let size = bytes / 1024;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) { size /= 1024; unit += 1; }
  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[unit]}`;
};
const formatDate = (date) => {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
const safeFilename = (name) => name.replace(/[<>:"/\\|?*]/g, '-').trim() || 'family-document';

export default function DocumentsPage() {
  const { documents, documentCategories, addDocument, removeDocument } = useFamily();
  const [category, setCategory] = useState('All Documents');
  const [query, setQuery] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [draft, setDraft] = useState({ name: '', category: documentCategories[0] || 'Other', description: '' });
  const [uploadError, setUploadError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [notice, setNotice] = useState('');

  const visibleDocuments = useMemo(() => documents.filter((document) => {
    const matchesCategory = category === 'All Documents' || document.category === category;
    const searchable = `${document.name} ${document.category} ${document.description || ''} ${document.type || ''} ${document.originalName || ''}`.toLowerCase();
    return matchesCategory && searchable.includes(query.trim().toLowerCase());
  }), [documents, category, query]);

  const downloadDocument = (document) => {
    const filename = safeFilename(document.dataUrl ? (document.originalName || `${document.name}.${(document.type || 'txt').toLowerCase()}`) : `${document.name}-archive-record.json`);
    let href = document.dataUrl;
    let objectUrl;
    if (!href) {
      const archive = new Blob([JSON.stringify({ ...document, dataUrl: undefined }, null, 2)], { type: 'application/json' });
      objectUrl = URL.createObjectURL(archive);
      href = objectUrl;
    }
    const anchor = window.document.createElement('a');
    anchor.href = href;
    anchor.download = filename;
    anchor.rel = 'noopener';
    window.document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    if (objectUrl) window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setUploadError('');
    const file = event.currentTarget.elements.namedItem('document-file')?.files?.[0];
    if (!file) { setUploadError('Choose a file to add to the vault.'); return; }
    if (file.size > MAX_FILE_BYTES) { setUploadError('Files must be 1 MB or smaller in this local archive demo.'); return; }
    const storedBytes = documents.reduce((total, item) => total + (item.dataUrl ? item.sizeBytes || 0 : 0), 0);
    if (storedBytes + file.size > MAX_ARCHIVE_BYTES) { setUploadError('The local archive limit is 2 MB of uploaded files. Remove an upload before adding another.'); return; }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const extension = file.name.includes('.') ? file.name.split('.').pop().toUpperCase() : 'FILE';
        const record = addDocument({
          name: draft.name.trim(), category: draft.category, description: draft.description.trim(),
          originalName: file.name, mimeType: file.type || 'application/octet-stream', sizeBytes: file.size,
          type: extension, date: new Date().toISOString().slice(0, 10), dataUrl: String(reader.result)
        });
        setNotice(`${record.name} added to the vault.`);
        setDraft({ name: '', category: documentCategories[0] || 'Other', description: '' });
        setUploadOpen(false);
      } catch {
        setUploadError('This file could not be added. Try a smaller file or free local browser storage.');
      } finally { setUploading(false); }
    };
    reader.onerror = () => { setUploadError('The file could not be read. Please try again.'); setUploading(false); };
    reader.readAsDataURL(file);
  };

  const handleDelete = (document) => {
    if (!window.confirm(`Remove “${document.name}” from the family archive?`)) return;
    removeDocument(document.id);
    setSelectedDocument(null);
    setNotice(`${document.name} was removed from the vault.`);
  };

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><div className="mb-2 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary"><Shield size={13} /> Heritage vault</div><h1 className="flex items-center gap-3 text-3xl font-black text-slate-900 dark:text-white"><FileText className="text-primary" /> Family Documents</h1><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Find family records by category and keep important documents together.</p></div>
        <button type="button" onClick={() => { setUploadError(''); setUploadOpen(true); }} className="inline-flex items-center justify-center gap-2 self-start rounded-2xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 transition hover:scale-[1.02] sm:self-auto"><Upload size={16} /> Upload document</button>
      </header>

      {notice && <div role="status" className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs font-semibold text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss message"><X size={15} /></button></div>}

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="space-y-5">
          <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-premium dark:border-slate-800 dark:bg-[#111D29]">
            <label htmlFor="document-search" className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-400">Search vault</label>
            <div className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input id="document-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, category, type…" className="w-full rounded-xl border border-transparent bg-slate-50 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-primary dark:bg-slate-900 dark:text-white" /></div>
            <h2 className="mb-2 mt-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Categories</h2>
            <div className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
              {['All Documents', ...documentCategories].map((item) => {
                const count = item === 'All Documents' ? documents.length : documents.filter((document) => document.category === item).length;
                return <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`flex shrink-0 items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${category === item ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-primary dark:hover:bg-slate-900'}`}><span>{item}</span><span className={`text-[10px] ${category === item ? 'text-primary' : 'text-slate-400'}`}>{count}</span></button>;
              })}
            </div>
          </section>
          <section className="rounded-3xl bg-slate-900 p-5 text-white">
            <Shield size={26} className="text-primary" /><h2 className="mt-3 text-base font-bold">Local archive demo</h2><p className="mt-2 text-xs leading-relaxed text-slate-400">Uploaded files stay in this browser and are limited to 1 MB each. This prototype does not provide server storage, encryption, or cross-device access.</p><Link to="/settings" className="mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-primary hover:underline">Manage family settings <ArrowRight size={12} /></Link>
          </section>
        </aside>

        <section className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-premium dark:border-slate-800 dark:bg-[#111D29]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800"><div><h2 className="text-sm font-bold text-slate-900 dark:text-white">{category === 'All Documents' ? 'Recent records' : category}</h2><p className="mt-1 text-[10px] text-slate-400">{visibleDocuments.length} {visibleDocuments.length === 1 ? 'record' : 'records'}</p></div>{(query || category !== 'All Documents') && <button type="button" onClick={() => { setQuery(''); setCategory('All Documents'); }} className="text-xs font-bold text-primary hover:underline">Clear filters</button>}</div>
          {visibleDocuments.length ? <ul className="divide-y divide-slate-100 dark:divide-slate-800">{visibleDocuments.map((doc) => <li key={doc.id} className="flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50/70 dark:hover:bg-slate-900/40 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-center gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800"><FileArchive size={21} /></span><div className="min-w-0"><h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">{doc.name}</h3><p className="mt-1 truncate text-[10px] font-semibold text-slate-400">{doc.category} · {doc.type || 'FILE'} · {formatBytes(doc.sizeBytes || 0)} · {formatDate(doc.date)}</p></div></div><div className="flex items-center gap-2 self-end sm:self-auto"><button type="button" onClick={() => setSelectedDocument(doc)} aria-label={`View details for ${doc.name}`} title="View details" className="rounded-xl p-2.5 text-slate-500 hover:bg-primary/10 hover:text-primary"><Eye size={17} /></button><button type="button" onClick={() => downloadDocument(doc)} aria-label={`Download ${doc.name}`} title="Download" className="rounded-xl p-2.5 text-slate-500 hover:bg-primary/10 hover:text-primary"><Download size={17} /></button><button type="button" onClick={() => handleDelete(doc)} aria-label={`Delete ${doc.name}`} title="Delete document" className="rounded-xl p-2.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"><Trash2 size={16} /></button></div></li>)}</ul> : <div className="px-6 py-16 text-center"><FileArchive size={30} className="mx-auto text-slate-300" /><p className="mt-3 text-sm font-bold text-slate-800 dark:text-white">No documents match this search and category.</p><p className="mt-1 text-xs text-slate-500">Try another category or add a family record.</p><button type="button" onClick={() => { setQuery(''); setCategory('All Documents'); setUploadOpen(true); }} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-primary"><Plus size={14} /> Add a document</button></div>}
        </section>
      </div>

      {(uploadOpen || selectedDocument) && <div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-slate-950/65 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) { setUploadOpen(false); setSelectedDocument(null); } }}>
        {uploadOpen && <section role="dialog" aria-modal="true" aria-labelledby="upload-title" className="my-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#111D29]"><div className="flex items-start justify-between"><div><h2 id="upload-title" className="text-xl font-black text-slate-900 dark:text-white">Add a family document</h2><p className="mt-1 text-xs text-slate-500">Small files are stored locally in this browser.</p></div><button type="button" onClick={() => setUploadOpen(false)} aria-label="Close upload form" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button></div><form onSubmit={handleUpload} className="mt-5 space-y-4"><div><label htmlFor="document-name" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-200">Record name</label><input id="document-name" required maxLength={100} value={draft.name} onChange={(event) => setDraft((previous) => ({ ...previous, name: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white" placeholder="e.g. Grandma's birth certificate" /></div><div><label htmlFor="document-category" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-200">Category</label><select id="document-category" value={draft.category} onChange={(event) => setDraft((previous) => ({ ...previous, category: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white">{documentCategories.map((item) => <option key={item}>{item}</option>)}</select></div><div><label htmlFor="document-description" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-200">Description <span className="font-normal text-slate-400">(optional)</span></label><textarea id="document-description" rows={2} maxLength={400} value={draft.description} onChange={(event) => setDraft((previous) => ({ ...previous, description: event.target.value }))} className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white" /></div><div><label htmlFor="document-file" className="mb-1.5 block text-xs font-bold text-slate-700 dark:text-slate-200">Choose file <span className="text-red-500">*</span></label><input id="document-file" name="document-file" type="file" required className="block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-2 file:text-xs file:font-bold file:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300" /><p className="mt-1 text-[10px] text-slate-400">Maximum 1 MB per file; 2 MB total uploaded storage.</p></div>{uploadError && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300"><AlertCircle size={15} className="shrink-0" />{uploadError}</p>}<div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setUploadOpen(false)} className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">Cancel</button><button type="submit" disabled={uploading} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-black text-white disabled:opacity-50"><Upload size={14} />{uploading ? 'Adding…' : 'Add to vault'}</button></div></form></section>}
        {selectedDocument && <section role="dialog" aria-modal="true" aria-labelledby="document-details-title" className="my-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#111D29]"><div className="flex items-start justify-between"><div><span className="text-[10px] font-black uppercase tracking-widest text-primary">{selectedDocument.category}</span><h2 id="document-details-title" className="mt-1 text-xl font-black text-slate-900 dark:text-white">{selectedDocument.name}</h2></div><button type="button" onClick={() => setSelectedDocument(null)} aria-label="Close document details" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><X size={18} /></button></div><dl className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 text-xs dark:bg-slate-900"><div className="flex justify-between gap-4"><dt className="text-slate-400">Type</dt><dd className="font-bold text-slate-800 dark:text-slate-200">{selectedDocument.type || 'FILE'}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-400">Size</dt><dd className="font-bold text-slate-800 dark:text-slate-200">{formatBytes(selectedDocument.sizeBytes || 0)}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-400">Date</dt><dd className="font-bold text-slate-800 dark:text-slate-200">{formatDate(selectedDocument.date)}</dd></div>{selectedDocument.originalName && <div className="flex justify-between gap-4"><dt className="text-slate-400">Original file</dt><dd className="max-w-52 truncate font-bold text-slate-800 dark:text-slate-200">{selectedDocument.originalName}</dd></div>}</dl>{selectedDocument.description && <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{selectedDocument.description}</p>}<div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => handleDelete(selectedDocument)} className="rounded-xl px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">Delete</button><button type="button" onClick={() => downloadDocument(selectedDocument)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white"><Download size={14} />Download</button></div></section>}
      </div>}
    </div>
  );
}
