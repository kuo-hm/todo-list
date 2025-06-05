const tagColors: Record<string, string> = {
  social: 'bg-red-900 text-red-200',
  'theme-support': 'bg-yellow-700 text-yellow-100',
  friends: 'bg-blue-900 text-blue-200',
  freelance: 'bg-green-900 text-green-200',
  coding: 'bg-purple-900 text-purple-200',
};

export interface TodoCardProps {
  todo: {
    id: string;
    title: string;
    tag: string;
    tagType: 'social' | 'theme-support' | 'friends' | 'freelance' | 'coding';
    users: string[];
    isFavorite: boolean;
    isChecked: boolean;
  };
}

export const TodoCard = ({ todo }: TodoCardProps) => (
  <div
    className={`flex items-center justify-between border rounded-lg px-4 py-3 transition ${todo.isChecked ? 'border-violet-500 bg-zinc-800' : 'border-zinc-800 bg-zinc-900'}`}
  >
    <div className="flex items-center gap-3">
      <input type="checkbox" checked={todo.isChecked} readOnly className="accent-violet-600" />
      <button className="text-zinc-400 text-lg">{todo.isFavorite ? '★' : '☆'}</button>
      <span
        className={`font-medium ${todo.isChecked ? 'text-zinc-400 line-through' : 'text-zinc-100'}`}
      >
        {todo.title}
      </span>
      <span className={`ml-2 text-xs px-2 py-1 rounded ${tagColors[todo.tagType]}`}>
        {todo.tag}
      </span>
    </div>
    <div className="flex items-center gap-1">
      {todo.users.map((user, idx) => (
        <span
          key={user + idx}
          className="w-7 h-7 flex items-center justify-center bg-zinc-700 text-zinc-200 rounded-full text-xs font-bold border-2 border-zinc-900 -ml-2 first:ml-0"
        >
          {user}
        </span>
      ))}
      <button className="ml-3 text-zinc-500 text-xl">...</button>
    </div>
  </div>
);
