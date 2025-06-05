import { useState } from 'react';
import { TodoCard } from './components/todo-card';

interface TodoItem {
  id: string;
  title: string;
  tag: string;
  tagType: 'social' | 'theme-support' | 'friends' | 'freelance' | 'coding';
  users: string[];
  isFavorite: boolean;
  isChecked: boolean;
}

const initialTodos: TodoItem[] = [
  {
    id: '1',
    title: 'How To Protect Your Computer Very Useful Tips',
    tag: 'Social',
    tagType: 'social',
    users: ['A', 'B', 'C', 'D', 'E', 'F'],
    isFavorite: false,
    isChecked: true,
  },
  {
    id: '2',
    title: 'How Hypnosis Can Help You',
    tag: 'Theme Support',
    tagType: 'theme-support',
    users: ['G', 'H'],
    isFavorite: false,
    isChecked: false,
  },
  {
    id: '3',
    title: 'Dealing With Technical Support 10 Useful Tips',
    tag: 'Friends',
    tagType: 'friends',
    users: ['I', 'J', 'K', 'L'],
    isFavorite: false,
    isChecked: false,
  },
  {
    id: '4',
    title: 'Get The Boot A Birds Eye Look Into Mcse Boot Camp',
    tag: 'Social',
    tagType: 'social',
    users: ['M', 'N'],
    isFavorite: true,
    isChecked: true,
  },
  {
    id: '5',
    title: 'Buying Used Electronic Test Equipment',
    tag: 'Freelance',
    tagType: 'freelance',
    users: ['O', 'P', 'Q'],
    isFavorite: false,
    isChecked: false,
  },
  {
    id: '6',
    title: 'Fix Responsiveness',
    tag: 'Theme Support',
    tagType: 'theme-support',
    users: ['R', 'S'],
    isFavorite: false,
    isChecked: false,
  },
];
export const HomePage = () => {
  const [search, setSearch] = useState('');

  const filteredTodos = initialTodos.filter(todo =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-zinc-100">Todo List</h2>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-semibold transition">
          Add Task
        </button>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search todo list"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-400 rounded-lg px-3 py-2 focus:outline-none"
        />
        <button className="border border-zinc-700 bg-zinc-800 text-zinc-400 rounded-lg px-3 py-2 cursor-not-allowed">
          Order by
        </button>
      </div>
      <div className="space-y-3">
        {filteredTodos.map(todo => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};
