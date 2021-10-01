import React from 'react'
import { Header } from './Header'
import { ImageSliding } from './ImageSliding'
import { PageContent } from './PageContent'

export function Welcome(){
   
    return(
        <div>
            <Header />
            <ImageSliding />
            <PageContent />
        </div>

    )
}