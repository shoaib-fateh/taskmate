export default function List({ list }) {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md w-64 min-h-[200px]">
        <h2 className="text-lg font-semibold">{list.title}</h2>
      </div>
    );
  }
  