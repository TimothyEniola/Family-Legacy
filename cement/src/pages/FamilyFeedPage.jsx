import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Image as ImageIcon, Globe2, Users, Sparkles, Plus } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';

export default function FamilyFeedPage() {
  const { familyGroups, familyPosts, addFamilyPost, togglePostReaction, addFamilyComment } = useFamily();
  const filters = useMemo(() => [
    { id: 'all', label: 'All families' },
    ...familyGroups.filter((family) => family.isPublic).map((family) => ({ id: family.id, label: family.name }))
  ], [familyGroups]);
  const [familyFilter, setFamilyFilter] = useState('all');
  const [postKind, setPostKind] = useState('status');
  const [familyId, setFamilyId] = useState(familyGroups[0]?.id ?? '');
  const [body, setBody] = useState('');
  const [commentDrafts, setCommentDrafts] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  const visiblePosts = useMemo(() => familyPosts
    .filter((post) => familyFilter === 'all' || post.familyId === familyFilter)
    .filter((post) => familyGroups.some((family) => family.id === post.familyId && family.isPublic)),
  [familyPosts, familyFilter, familyGroups]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!body.trim() || !familyId) return;
    addFamilyPost({ body, kind: postKind, familyId });
    setBody('');
  };

  const handleComment = (event, postId) => {
    event.preventDefault();
    const text = commentDrafts[postId]?.trim();
    if (!text) return;
    addFamilyComment(postId, text);
    setCommentDrafts((previous) => ({ ...previous, [postId]: '' }));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            <Globe2 size={14} /> Public family moments
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">Family Feed</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">Browse stories and status updates shared by public family groups. Posts you publish here are visible to every family in this demo archive.</p>
        </div>
        <Link to="/community" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-800 dark:bg-[#111D29] dark:text-slate-200">
          <Users size={16} /> Family community
        </Link>
      </header>

      <section aria-label="Create a family post" className="rounded-3xl border border-slate-100 bg-white p-5 shadow-premium dark:border-slate-800 dark:bg-[#111D29] sm:p-7">
        <div className="mb-4 flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Your profile" className="h-11 w-11 rounded-2xl object-cover" />
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Share with the family network</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">A status, memory, or family update</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="sr-only" htmlFor="family-post">Write a post</label>
          <textarea id="family-post" value={body} onChange={(event) => setBody(event.target.value)} maxLength={1000} rows={3} placeholder="What would you like the families to know?" className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white" />
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="post-family">Posting family</label>
              <select id="post-family" value={familyId} onChange={(event) => setFamilyId(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                {familyGroups.filter((family) => family.isPublic).map((family) => <option key={family.id} value={family.id}>{family.name}</option>)}
              </select>
              <label className="sr-only" htmlFor="post-kind">Post type</label>
              <select id="post-kind" value={postKind} onChange={(event) => setPostKind(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                <option value="status">Status update</option>
                <option value="memory">Family memory</option>
                <option value="post">General post</option>
              </select>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400"><ImageIcon size={13} /> Public archive demo</span>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="text-[10px] text-slate-400">{body.length}/1000</span>
              <button type="submit" disabled={!body.trim()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50">
                <Send size={14} /> Share post
              </button>
            </div>
          </div>
        </form>
      </section>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Stories from families</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">{visiblePosts.length} public {visiblePosts.length === 1 ? 'post' : 'posts'}</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter posts by family">
          {filters.map((filter) => (
            <button key={filter.id} type="button" onClick={() => setFamilyFilter(filter.id)} aria-pressed={familyFilter === filter.id} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${familyFilter === filter.id ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white text-slate-500 hover:text-primary dark:bg-[#111D29] dark:text-slate-300'}`}>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {visiblePosts.map((post, index) => (
          <motion.article key={post.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.04, 0.2) }} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-premium dark:border-slate-800 dark:bg-[#111D29]">
            <div className="flex items-start gap-3 p-5 sm:p-6">
              <img src={post.authorAvatar} alt="" className="h-11 w-11 shrink-0 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{post.authorName}</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-xs font-semibold text-primary">{post.familyName}</span>
                  <span className="ml-auto text-[10px] text-slate-400">{post.createdAt}</span>
                </div>
                <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-400"><Sparkles size={11} /> {post.kind === 'status' ? 'Status update' : post.kind === 'memory' ? 'Family memory' : 'Family post'}</span>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">{post.body}</p>
              </div>
            </div>
            {post.imageUrl && <img src={post.imageUrl} alt="Shared family memory" loading="lazy" className="max-h-[420px] w-full object-cover" />}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 dark:border-slate-800 sm:px-6">
              <span className="text-xs text-slate-400">{post.reactions?.heart || 0} appreciations · {post.reactions?.comments || 0} comments</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => togglePostReaction(post.id)} aria-pressed={Boolean(post.likedByCurrentUser)} className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${post.likedByCurrentUser ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10' : 'text-slate-500 hover:bg-slate-50 hover:text-rose-500 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
                  <Heart size={15} fill={post.likedByCurrentUser ? 'currentColor' : 'none'} /> Appreciate
                </button>
                <button type="button" onClick={() => setExpandedComments((previous) => ({ ...previous, [post.id]: !previous[post.id] }))} aria-expanded={Boolean(expandedComments[post.id])} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-50 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800">
                  <MessageCircle size={15} /> Comment
                </button>
              </div>
            </div>
            {expandedComments[post.id] && (
              <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-6">
                <div className="mb-3 space-y-2">
                  {(post.comments || []).map((comment) => <p key={comment.id} className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-300"><strong className="mr-2 text-slate-900 dark:text-white">{comment.author}</strong>{comment.body}</p>)}
                </div>
                <form onSubmit={(event) => handleComment(event, post.id)} className="flex gap-2">
                  <label className="sr-only" htmlFor={`comment-${post.id}`}>Write a comment</label>
                  <input id={`comment-${post.id}`} value={commentDrafts[post.id] || ''} onChange={(event) => setCommentDrafts((previous) => ({ ...previous, [post.id]: event.target.value }))} placeholder="Add a thoughtful comment…" className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-primary dark:border-slate-800 dark:bg-slate-900 dark:text-white" />
                  <button type="submit" disabled={!commentDrafts[post.id]?.trim()} className="rounded-xl bg-primary px-4 text-xs font-bold text-white disabled:opacity-50">Send</button>
                </form>
              </div>
            )}
          </motion.article>
        ))}
        {!visiblePosts.length && (
          <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center dark:border-slate-700">
            <Users className="mx-auto text-slate-300" size={32} />
            <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-200">No stories in this family feed yet</p>
            <p className="mt-1 text-xs text-slate-500">Be the first to share a family moment.</p>
            <button type="button" onClick={() => document.getElementById('family-post')?.focus()} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-primary"><Plus size={14} /> Write a post</button>
          </div>
        )}
      </div>
    </div>
  );
}
