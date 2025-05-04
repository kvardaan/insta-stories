import { IStory } from "../lib/types"

interface IStoryItemProps {
  story: IStory
  onStoryOpen: (story: IStory) => void
}

export const StoryItem: React.FC<IStoryItemProps> = ({ story, onStoryOpen }) => {
  return (
    <div
      className="flex flex-shrink-0 flex-col items-center gap-y-2"
      onClick={() => onStoryOpen(story)}
    >
      <img
        src={story.url}
        alt={story.name}
        className={`h-20 w-20 rounded-full ring-3 ring-offset-3 ${story.isViewed ? "ring-neutral-500" : "ring-red-500"}`}
      />
      <p className="text-sm font-medium">{story.name}</p>
    </div>
  )
}
