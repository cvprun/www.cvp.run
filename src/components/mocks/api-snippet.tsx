/** Terminal-style API example. Code is language-independent by design. */
export function MockApiSnippet() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-border bg-neutral-950 text-left shadow-xl shadow-black/10 select-none"
      aria-hidden
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-green-400/80" />
        <span className="ml-2 font-mono text-[10px] text-neutral-500">terminal</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
        <code>
          <span className="text-neutral-500">$ </span>
          <span className="text-neutral-200">curl </span>
          <span className="text-brand-cyan">
            https://app.cvp.run/api/proj/&lt;project&gt;/datasets
          </span>
          {' \\\n'}
          <span className="text-neutral-200">{'    -H '}</span>
          <span className="text-violet-400">
            &quot;Authorization: Bearer cvp_9f2a7b1c4e8d…&quot;
          </span>
          {'\n\n'}
          <span className="text-neutral-500">{'{\n'}</span>
          <span className="text-neutral-500">{'  '}</span>
          <span className="text-sky-400">&quot;datasets&quot;</span>
          <span className="text-neutral-500">: [</span>
          {'\n'}
          <span className="text-neutral-500">{'    { '}</span>
          <span className="text-sky-400">&quot;name&quot;</span>
          <span className="text-neutral-500">: </span>
          <span className="text-emerald-400">&quot;vehicle-detection-v3&quot;</span>
          <span className="text-neutral-500">, </span>
          <span className="text-sky-400">&quot;type&quot;</span>
          <span className="text-neutral-500">: </span>
          <span className="text-emerald-400">&quot;image&quot;</span>
          <span className="text-neutral-500">, </span>
          <span className="text-sky-400">&quot;samples&quot;</span>
          <span className="text-neutral-500">: </span>
          <span className="text-amber-300">1240</span>
          <span className="text-neutral-500">{' },\n'}</span>
          <span className="text-neutral-500">{'    { '}</span>
          <span className="text-sky-400">&quot;name&quot;</span>
          <span className="text-neutral-500">: </span>
          <span className="text-emerald-400">&quot;warehouse-lidar&quot;</span>
          <span className="text-neutral-500">, </span>
          <span className="text-sky-400">&quot;type&quot;</span>
          <span className="text-neutral-500">: </span>
          <span className="text-emerald-400">&quot;point_cloud&quot;</span>
          <span className="text-neutral-500">, </span>
          <span className="text-sky-400">&quot;samples&quot;</span>
          <span className="text-neutral-500">: </span>
          <span className="text-amber-300">86</span>
          <span className="text-neutral-500">{' }\n'}</span>
          <span className="text-neutral-500">{'  ]\n}'}</span>
        </code>
      </pre>
    </div>
  );
}
