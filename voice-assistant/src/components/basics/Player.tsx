import * as React from 'react'
import StopIcon from '@mui/icons-material/Stop'

const Player = React.forwardRef(function Player(
  props: { className?: string },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { className = '', ...other } = props

  return (
    <div className={`max-w-[600px] max-h-[240px] m-auto ${className}`} {...other} ref={ref}>
      <div className="bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
        <div className="space-y-2">
          <div className="relative">
            <div className="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 dark:bg-cyan-400 w-1/2 h-2"
                role="progressbar"
                aria-label="music progress"
                aria-valuenow={1456}
                aria-valuemin={0}
                aria-valuemax={4550}
              ></div>
            </div>
            <div className="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
              <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
            <div className="text-cyan-500 dark:text-slate-100">24:16</div>
            <div className="text-slate-500 dark:text-slate-400">75:50</div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
        <div className="flex-auto flex items-center justify-evenly"></div>
        <button
          type="button"
          className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          aria-label="Pause"
        >
          <svg width="30" height="32" fill="currentColor">
            <rect x="6" y="4" width="4" height="24" rx="2" />
            <rect x="20" y="4" width="4" height="24" rx="2" />
          </svg>
        </button>
        <div className="flex-auto flex items-center justify-evenly">
          <button type="button" aria-label="Stop">
            <StopIcon />
          </button>

          <button type="button" aria-label="Stop">
            <svg width="24" height="24" fill="none">
              <path
                d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 5v3.111c0 .491-.398.889-.889.889H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button type="button" className="hidden sm:block lg:hidden xl:block" aria-label="Next">
            <svg width="24" height="24" fill="none">
              <path
                d="M14 12 6 6v12l8-6Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 6v12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500"
          >
            1x
          </button>
        </div>
      </div>
    </div>
  )
})

export default Player
