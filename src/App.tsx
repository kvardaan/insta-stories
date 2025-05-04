import { useState } from "react"

import { useIsMobile } from "./hooks/useIsMobile"
import { NonMobileScreen } from "./components/nonMobileScreen"
import { IStory } from "./lib/types"
import { StoryBar } from "./components/storyBar"
import { StoryViewer } from "./components/storyViewer"
import { storiesData } from "./lib/data"

function App() {
  const { isMobile } = useIsMobile()
  const [stories, setStories] = useState<IStory[]>(storiesData)
  const [activeStory, setActiveStory] = useState<IStory | null>(null)
  const [showStoryViewer, setShowStoryViewer] = useState<boolean>(false)

  // when not on mobile
  if (!isMobile) return <NonMobileScreen />

  // function to handle opening a story
  const handleStoryOpen = (story: IStory) => {
    setShowStoryViewer(true)
    setActiveStory(story)
  }

  // function to mark story as viewed
  const handleStoryView = (viewedStory: IStory) => {
    const updatedStories = stories.map((story) =>
      story.id === viewedStory.id ? { ...story, isViewed: true } : story
    )
    setStories(updatedStories)
  }

  // function to handle manual close button
  const handleManualClose = () => {
    if (activeStory) {
      handleStoryView(activeStory)
    }
    setShowStoryViewer(false)
    setActiveStory(null)
  }

  // function to handle automatic progression after timer complete
  const handleStoryCompleted = () => {
    if (activeStory) {
      const currentStoryId = activeStory.id
      handleStoryView(activeStory)

      // finds the next unviewed story if available
      const unviewedStories = stories.filter(
        (story) => !story.isViewed && story.id !== currentStoryId
      )

      // move to the next unviewed story or close the viewer
      if (unviewedStories.length > 0) setActiveStory(unviewedStories[0])
      else {
        setActiveStory(null)
        setShowStoryViewer(false)
      }
    } else {
      setActiveStory(null)
      setShowStoryViewer(false)
    }
  }

  //
  const handleNextStory = () => {
    if (!activeStory) return

    const currentIdx = stories.findIndex((story) => story.id === activeStory.id)

    if (currentIdx < stories.length - 1) {
      setActiveStory(stories[currentIdx + 1])
    } else {
      setShowStoryViewer(false)
      setActiveStory(null)
    }
  }

  const handlePreviousStory = () => {
    if (!activeStory) return

    const currentIndex = stories.findIndex((story) => story.id === activeStory.id)

    if (currentIndex > 0) {
      setActiveStory(stories[currentIndex - 1])
    }
  }

  return (
    <main className="flex h-screen">
      <StoryBar onStoryOpen={handleStoryOpen} stories={stories} />
      {showStoryViewer && activeStory ? (
        <StoryViewer
          story={activeStory}
          onClose={handleManualClose}
          onCompleted={handleStoryCompleted}
          onNext={handleNextStory}
          onPrevious={handlePreviousStory}
        />
      ) : null}
    </main>
  )
}

export default App
