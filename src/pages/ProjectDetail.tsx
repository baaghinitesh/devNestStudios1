import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'

export default function ProjectDetail() {
  const { slug } = useParams()

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Project: {slug}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Detailed case study and project breakdown.
          </p>
          <p className="text-muted-foreground mb-8">
            This page will feature comprehensive project details, metrics, testimonials, and technical breakdown.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/projects">← Back to Projects</Link>
            </Button>
            <Button variant="primary" asChild>
              <Link to="/contact">Start Similar Project</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}