import { useEffect, useState } from "react"

import { IStory } from "../lib/types"

interface IStoryViewerProps {
  story: IStory
  onClose: () => void
  onCompleted?: () => void
  onNext?: () => void
  onPrevious?: () => void
}

export const StoryViewer: React.FC<IStoryViewerProps> = ({
  story,
  onClose,
  onCompleted = onClose,
  onNext,
  onPrevious,
}) => {
  const [progress, setProgress] = useState<number>(0)

  // reset the progress on story change
  useEffect(() => setProgress(0), [story.id])

  // progress animation
  useEffect(() => {
    // interval to update progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2 // calculates new progress by adding 2% every 100ms

        // if animation is complete
        if (newProgress >= 100) {
          clearInterval(interval)
          // story complete -> close animation
          setTimeout(() => onCompleted(), 100)
          return 100
        }
        return newProgress
      })
    }, 100) // updates every 100ms

    return () => clearInterval(interval)
  }, [onCompleted, onClose])

  // handles screen tap behavior to move b/w stories
  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickX = e.clientX // x co-ordinate of the screen where the user tapped
    const screenWidth = window.innerWidth // screen width
    const boundary = screenWidth * 0.1 // 10% of the screen width for the boundary where tap will work

    if (clickX <= boundary) {
      onPrevious?.()
    } else if (clickX >= screenWidth - boundary) {
      onNext?.()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="absolute top-4 left-4 text-sm text-white">{story.name}</div>
      <div className="absolute top-0 flex h-1 w-full bg-gray-700">
        <div
          key={story.id}
          className="h-full bg-white"
          style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
        />
      </div>

      <div className="absolute inset-0 flex" onClick={handleScreenTap}>
        <div className="h-full w-1/2"></div>
        <div className="h-full w-1/2"></div>
      </div>

      <img src={story.url} className="max-h-[80vh]" />

      <button onClick={onClose} className="absolute top-4 right-4 text-lg text-white">
        x
      </button>
    </div>
  )
}
