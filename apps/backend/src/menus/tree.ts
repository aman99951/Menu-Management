export type TreeNode = { id: string; name: string; depth: number; children: TreeNode[] };
export const buildTree = (rows: any[]): TreeNode => {
const byId = new Map<string, any>();
rows.forEach(r => byId.set(r.id, { ...r, children: [] }));
let root: any | null = null;
rows.forEach(r => {
const node = byId.get(r.id)!;
if (!r.parentId) root = node; else byId.get(r.parentId)?.children.push(node);
});
// sort siblings by position
byId.forEach(n => n.children.sort((a: any,b: any)=>a.position-b.position));
return { id: root.id, name: root.name, depth: root.depth, children: root.children };
};