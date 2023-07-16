
export default function MockupPreview({ className } : { className ?: string }) {
  return (
    <div className={`${className} bg-white rounded-lg p-4`}>
      Mockup Preview
    </div>
  )
}