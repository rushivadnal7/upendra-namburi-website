import { Button } from '@/components/ui/button'
import SectionTitle from '@/custom/SectionTitle'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Articles = ({ articlesRef, articleData }: any) => {
  const [showAll, setShowAll] = useState(false)
  const visibleArticles = showAll ? articleData : articleData.slice(0, 4)

  return (
    <section ref={articlesRef} className="py-24 max-w-7xl mx-auto">
      <div className="container relative mx-auto px-6">
        <SectionTitle text='Articles' />


        <div className=" grid md:grid-cols-2 gap-8">
          {visibleArticles.map((article: any) => (
            <div
              key={article.id}
              className="article-item bg-white p-6 rounded-lg hover:shadow-xl transition-shadow shadow-md"
            >
              <span className="text-gray-500 text-sm">{article.source}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{article.title}</h3>
              <p className="text-gray-700 mb-4 line-clamp-1">{article.description}</p>
              <Link
                to={article.url}
                className="text-black hover:text-gray-600 flex items-center gap-1"
              >
                Read Article <ExternalLink size={16} />
              </Link>
            </div>
          ))}
        </div>

        {articleData.length > 4 && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white rounded-full px-8"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'View Less' : 'View All Articles'}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Articles
