export default function Loading(props: { color?: string; children?: React.ReactNode }) {
  const { color = '#d4d4d4' } = props
  return (
    <div className="flex flex-col items-center justify-center gap-2.5">
      <svg
        className="animate-spin border-indigo-300"
        xmlns="http://www.w3.org/2000/svg"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M26.9366 0.0604665C26.1337 0.321139 25.6707 0.784556 25.4465 1.54123C25.3199 1.96482 25.2982 2.94958 25.2982 8.09062C25.2982 14.9007 25.291 14.8138 25.9854 15.5089C26.9149 16.4358 29.0848 16.4358 30.0143 15.5089C30.7087 14.8138 30.7015 14.9007 30.7015 8.09062C30.7015 1.5014 30.6906 1.38555 30.1554 0.748351C29.7069 0.216146 29.2259 0.0387438 28.1445 0.0097802C27.7412 -0.0129754 27.3366 0.00400155 26.9366 0.0604665ZM45.5514 7.2724C45.1065 7.47876 44.347 8.19199 40.7232 11.8305C37.3923 15.1722 36.376 16.2511 36.2132 16.6059C36.078 16.9001 36.0083 17.2202 36.0089 17.544C36.0095 17.8678 36.0805 18.1876 36.2168 18.4813C36.47 19.0244 37.3018 19.8788 37.8624 20.1721C38.4302 20.4689 39.2729 20.4653 39.8624 20.1648C40.4664 19.8535 48.8208 11.4902 49.1319 10.8856C49.28 10.5743 49.3578 10.2342 49.3596 9.88938C49.3615 9.54459 49.2874 9.20362 49.1427 8.89074C48.7424 8.22072 48.1771 7.66474 47.5008 7.27602C47.2014 7.11417 46.8667 7.02912 46.5265 7.02849C46.1863 7.02785 45.8513 7.11166 45.5514 7.2724ZM41.5442 25.3602C41.0551 25.495 40.6131 25.7633 40.2675 26.1349C39.772 26.8047 39.6165 28.166 39.9275 29.1254C40.1373 29.7771 40.6653 30.3057 41.3163 30.5157C41.7575 30.6605 42.4772 30.6786 47.8624 30.6786C53.0306 30.6786 53.9818 30.6569 54.4085 30.5302C55.4754 30.2116 55.9962 29.3716 55.9998 27.9705C55.9998 26.5766 55.4682 25.7403 54.3651 25.4072C53.9926 25.295 52.8244 25.2733 47.8769 25.2805C44.5568 25.2877 41.7069 25.3239 41.5442 25.3602ZM37.9564 36.1781C37.385 36.4387 36.5423 37.2642 36.2494 37.8507C36.1 38.1439 36.0185 38.467 36.0109 38.7961C36.0034 39.1252 36.0701 39.4517 36.206 39.7514C36.4736 40.3488 44.8787 48.7917 45.5405 49.1284C46.4772 49.6099 47.4393 49.3746 48.4085 48.426C49.3633 47.4919 49.6165 46.4782 49.1319 45.5333C48.7955 44.8707 40.3615 36.4568 39.7648 36.1889C39.4796 36.0653 39.1725 36.0006 38.8617 35.9988C38.551 35.9969 38.2431 36.0579 37.9564 36.1781ZM27.0776 39.8383C26.589 39.9761 26.1474 40.2453 25.8009 40.6167C25.3018 41.2901 25.2982 41.3372 25.2982 47.8468C25.2982 53.0312 25.3199 53.9834 25.4465 54.4106C25.7648 55.4787 26.6074 56 27.9998 56C29.3923 56 30.2349 55.4787 30.5532 54.4106C30.7774 53.6431 30.7738 42.0033 30.546 41.3336C30.4759 41.0635 30.3477 40.8121 30.1702 40.5969C29.9928 40.3818 29.7705 40.2081 29.5188 40.0881C29.121 39.8709 28.8895 39.8166 28.206 39.7913C27.8292 39.7686 27.4512 39.7843 27.0776 39.8383Z"
          fill={color}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.02351 7.21449C8.45208 7.47516 7.6094 8.30063 7.31646 8.88714C7.16702 9.18034 7.08552 9.50348 7.07801 9.83255C7.07049 10.1616 7.13716 10.4881 7.27306 10.7879C7.54069 11.3852 15.9457 19.8281 16.6076 20.1648C17.5443 20.6464 18.5063 20.411 19.4756 19.4625C20.4304 18.5284 20.6835 17.5147 20.1989 16.5697C19.8626 15.9072 11.4286 7.49327 10.8318 7.22535C10.5467 7.10174 10.2395 7.03706 9.92877 7.0352C9.61804 7.03333 9.31013 7.09432 9.02351 7.21449ZM1.59494 25.4109C0.528029 25.7476 0 26.5984 0 27.9705C0.00361664 29.3716 0.524413 30.2116 1.59132 30.5302C2.01808 30.6569 2.96926 30.6786 8.13743 30.6786C13.5226 30.6786 14.2423 30.6605 14.6835 30.5157C15.0077 30.4091 15.3022 30.2277 15.5434 29.9862C15.7847 29.7447 15.9658 29.4499 16.0723 29.1254C16.3834 28.166 16.2278 26.8047 15.7324 26.1313C15.5338 25.9152 15.3002 25.7341 15.0416 25.5955L14.5461 25.3204L8.27848 25.2986C3.23327 25.2841 1.92767 25.3059 1.59494 25.4109ZM16.6184 36.236C16.1736 36.4424 15.4141 37.1556 11.7902 40.7941C8.45931 44.1358 7.44304 45.2147 7.28029 45.5695C7.14506 45.8637 7.07535 46.1838 7.07597 46.5076C7.0766 46.8314 7.14755 47.1513 7.28391 47.4449C7.53707 47.988 8.3689 48.8424 8.92948 49.1357C9.49729 49.4325 10.34 49.4289 10.9295 49.1284C11.5335 48.8171 19.8879 40.4538 20.1989 39.8492C20.3471 39.5379 20.4248 39.1978 20.4267 38.853C20.4286 38.5082 20.3545 38.1672 20.2098 37.8543C19.8095 37.1843 19.2441 36.6283 18.5678 36.2396C18.2685 36.0778 17.9338 35.9927 17.5936 35.9921C17.2534 35.9915 16.9184 36.0753 16.6184 36.236Z"
          fill="#737373"
        />
      </svg>
      <p className="text-xl font-medium leading-snug text-gray-500">
        {props.children || (
          <>
            Loading<span className="animate-pulse">...</span>
          </>
        )}
      </p>
    </div>
  )
}
