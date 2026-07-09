function StatCard({ title, value, color, icon }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-cyan-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-700 text-base font-semibold">
            {title}
          </p>

          <h2 className="text-5xl font-extrabold text-black mt-3">
            {value}
          </h2>

        </div>

        <div className={`${color} text-white p-5 rounded-2xl shadow-lg`}>
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;