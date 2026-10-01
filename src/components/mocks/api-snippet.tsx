import type {ReactNode} from 'react';

/**
 * Terminal session using the real integration surfaces: the `cvp` CLI
 * (docs/guides/cli.md in the app repo) and the project's MLflow-compatible
 * tracking endpoint (docs/guides/mlflow-client.md). Commands are
 * language-independent by design; outputs shown are only what the commands
 * print verbatim (jq results).
 */
function Cmd({children}: {children: ReactNode}) {
  return (
    <span className="block">
      <span className="text-neutral-500">$ </span>
      {children}
    </span>
  );
}

function Comment({children}: {children: ReactNode}) {
  return <span className="block text-neutral-500"># {children}</span>;
}

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
      <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-neutral-200 sm:text-xs">
        <code>
          <Comment>CLI — one binary, browser login</Comment>
          <Cmd>
            curl -fsSL{' '}
            <span className="text-brand-cyan">https://app.cvp.run/cli/install.sh</span>{' '}
            | sh
          </Cmd>
          <Cmd>cvp login</Cmd>
          <Cmd>
            cvp dataset upload <span className="text-amber-300">3f9c2a1e</span>{' '}
            ./frames/*.jpg
          </Cmd>
          <Cmd>
            cvp agent list <span className="text-violet-400">--json</span> | jq -r{' '}
            <span className="text-emerald-400">
              &apos;.[] | select(.status==&quot;active&quot;) | .name&apos;
            </span>
          </Cmd>
          <span className="block text-neutral-400">gpu-node-01</span>
          <span className="block text-neutral-400">line-02-edge</span>
          {'\n'}
          <Comment>MLflow — your training script, unchanged</Comment>
          <Cmd>
            export MLFLOW_TRACKING_URI=
            <span className="text-brand-cyan">
              https://app.cvp.run/api/proj/av-poc/mlflow
            </span>
          </Cmd>
          <Cmd>
            export MLFLOW_TRACKING_TOKEN=
            <span className="text-violet-400">cvp_9f2a7b1c4e8d…</span>
          </Cmd>
          <Cmd>python train.py</Cmd>
        </code>
      </pre>
    </div>
  );
}
