import cx from 'classnames';

type Props = { 
  labels: string[]
}

export function Labels({ labels }: Props) {
    return (
      <div className="relative">
        <hr className="h-1 bg-gray-400" />
        <div className="flex justify-between gap-2 text-xs text-gray-700">
          {labels.map((label, index) => {
            const isFirst = index === 0;
            const isLast = index === labels.length - 1;
  
            return (
              <div key={label} className="flex-column flex justify-center">
                <div
                  className={cx(
                    "absolute -top-6 inline-block px-2",
                    [
                      "before:absolute",
                      "before:top-5",
                      "before:left-1/2",
                      "before:h-2",
                      "before:w-1",
                      "before:-translate-x-1/2",
                      "before:bg-gray-400",
                      "before:content-[' ']",
                    ],
                    {
                      "-left-5": isFirst,
                      "-right-5": isLast,
                    }
                  )}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  