import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { StarIcon } from 'lucide-react'

function Products() { 
  return (
    <div>
      <Card className='w-[30%]'>
        <CardContent className="p-3">
          <div className="aspect-square rounded-md bg-gray-100 mb-2">
            <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
              <img src="/uploads/products/1762754166943-Screenshot_from_2025-11-04_21-38-55.png" alt="" />
            </div>
          </div>

        <CardTitle className="text-sm mb-1">Wireless Headphones</CardTitle>
        <CardDescription className="text-xs line-clamp-2">
            High-quality wireless headphones
          </CardDescription>
        </CardContent>  
        <div className="flex items-center space-x-1">
            <div className="flex p-4">
              {[1, 2, 3, 4].map((star) => (
                <StarIcon
                  key={star}
                  className="h-3 w-3 fill-yellow-400 text-yellow-400"
                />
              ))}
              <StarIcon className="h-3 w-3 text-gray-300" />
            </div>
            <span className="text-xs text-muted-foreground">(4.0)</span>
          </div>
          <div className="flex items-center justify-between px-4 mb-2">
            <span className="text-sm font-bold">$199</span>
            <Button size="sm" className="text-xs px-2 py-1 h-7">Add</Button>
          </div>
      </Card>
    </div>
  )
}

export default Products