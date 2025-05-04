export const NonMobileScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center px-10">
      <h1 className="text-center font-medium text-red-500">
        This product is only accessible on mobile devices. Please use a mobile screen size (less
        than 600px width).
      </h1>
    </div>
  )
}
