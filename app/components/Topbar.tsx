export function Topbar() {
  return (
    <div className="bg-white p-4 shadow rounded-xl mb-6 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Welcome to your Money Panel</h2>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">Hernando</span>
        <img
          src="https://api.dicebear.com/7.x/identicon/svg?seed=money"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}
