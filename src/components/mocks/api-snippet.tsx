import type {ReactNode} from 'react';

/**
 * Terminal session using the real integration surfaces: the `cvp` CLI
 * (`docs/guides/cli.md` and the commands' `examples:` lists in the app repo),
 * the project S3 endpoint (`docs/guides/s3-client.md`) and the
 * MLflow-compatible tracking endpoint (`docs/guides/mlflow-client.md`).
 * Commands are language-independent by design and no output is invented.
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

function Url({children}: {children: ReactNode}) {
  return <span className="text-brand-cyan">{children}</span>;
}

function Flag({children}: {children: ReactNode}) {
  return <span className="text-violet-400">{children}</span>;
}

function Arg({children}: {children: ReactNode}) {
  return <span className="text-amber-300">{children}</span>;
}

export function MockApiSnippet() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-border bg-neutral-950 text-left shadow-xl shadow-black/10 select-none"
      aria-hidden
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[10px] text-neutral-500">terminal</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-neutral-200 sm:text-xs">
        <code>
          <Comment>CLI — one executable, device-code login in the browser</Comment>
          <Cmd>
            curl -fsSL <Url>https://app.cvp.run/cli/install.sh</Url> | sh
          </Cmd>
          <Cmd>cvp login</Cmd>
          <Cmd>
            cvp dataset sample list <Arg>line-a-defects</Arg> <Flag>--status</Flag>{' '}
            labeled <Flag>--comment</Flag> open
          </Cmd>
          <Cmd>
            cvp infer run detection <Flag>--sample</Flag>{' '}
            <Arg>Street/frame-001.jpg</Arg> <Flag>--threshold</Flag> 0.4
          </Cmd>
          <Cmd>
            cvp mlops run logs <Arg>detector#3</Arg> <Flag>--follow</Flag>
          </Cmd>
          {'\n'}
          <Comment>S3 — DVC, the aws CLI and other S3 clients</Comment>
          <Cmd>
            aws s3 sync ./data <Arg>s3://weld-line/data/</Arg>{' '}
            <Flag>--endpoint-url</Flag> <Url>https://app.cvp.run/s3</Url>
          </Cmd>
          {'\n'}
          <Comment>MLflow — your training script, unchanged</Comment>
          <Cmd>
            export MLFLOW_TRACKING_URI=
            <Url>https://app.cvp.run/api/proj/weld-line/mlflow</Url>
          </Cmd>
          <Cmd>
            export MLFLOW_TRACKING_TOKEN=<Flag>cvp_9f2a7b1c4e8d…</Flag>
          </Cmd>
          <Cmd>python train.py</Cmd>
        </code>
      </pre>
    </div>
  );
}
