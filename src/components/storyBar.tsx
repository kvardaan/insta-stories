import { IStory } from "../lib/types"
import { StoryItem } from "./storyItem"
import { storiesData } from "../lib/data"

interface IStoryBarProps {
  onStoryOpen: (story: IStory) => void
  stories?: IStory[]
}

export const StoryBar: React.FC<IStoryBarProps> = ({ onStoryOpen, stories = storiesData }) => {
  // sorts the data to move the viewed stories at the end of the list
  const sortedStoriesData = [...stories].sort(
    (a: IStory, b: IStory) => Number(a.isViewed) - Number(b.isViewed)
  )

  return (
    <div className="w-screen">
      <div className="scroll-bar scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 mt-1 flex flex-row gap-x-5 overflow-x-auto border-b border-black/25 px-4 py-2">
        {sortedStoriesData.map((story) => (
          <StoryItem key={story.id} story={story} onStoryOpen={onStoryOpen} />
        ))}
      </div>
    </div>
  )
}
