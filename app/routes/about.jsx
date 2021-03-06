import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import { recordVisit } from '../utils/analytics'

const frontEndImages = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png',
    alt: 'react-logo'
  },
  {
    url: 'https://res.cloudinary.com/practicaldev/image/fetch/s--UZwm6YDO--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c97xibe1v9sti8zd6oqu.png',
    alt: 'remix-logo'
  },
  {
    url: 'https://seeklogo.com/images/M/material-ui-logo-5BDCB9BA8F-seeklogo.com.png',
    alt: 'material-ui-logo'
  },
  {
    url: 'https://cdn.worldvectorlogo.com/logos/vercel.svg',
    alt: 'vercel-logo'
  }
]

const backEndImages = [
  {
    url: 'https://wiki.postgresql.org/images/9/9a/PostgreSQL_logo.3colors.540x557.png',
    alt: 'postgres-logo'
  },
  {
    url: 'https://www.raspberrypi.org/app/uploads/2018/03/RPi-Logo-Reg-SCREEN.png',
    alt: 'raspberry-pi-logo'
  },
  {
    url: 'https://raw.githubusercontent.com/github/explore/d236cc6153f7ab3e68694234be43003b74cfe151/topics/fastify/fastify.png',
    alt: 'fastify-logo'
  },
  {
    url: 'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg',
    alt: 'node-js-logo'
  }
]

export const loader = async ({ request }) => {
  recordVisit(request) 

  return null;
}

// https://remix.run/guides/routing#index-routes
export default function About () {
  const isLargerThanMobile = useMediaQuery('(min-width:600px)')

  const Images = ({ imageList }) => imageList.map((img, i) => {
    return (
      <Box key={i} component='img' src={img.url} alt={img.alt} height={isLargerThanMobile ? '125px' : '90px'} width={isLargerThanMobile ? '125px' : '90px'} />
    )
  })

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      <main>
        <Box sx={{ margin: '1em' }}>
          <Box>
            <h2>Background</h2>
            <p>I threw this website together for a few reasons:
              <ul>
                <li>I wanted it to exist so that I could find highly rated books which weren't excessively long</li>
                <li>To play around with some emerging frameworks (Fastify, Remix)</li>
                <li>To see first hand how a Postgres DB served from a Raspberry Pi would perform </li>
                <li>To reacquaint myself with some relational database concepts  </li>
              </ul>

              I try to read every night but I usually fall asleep after about 10 minutes so diving into a &gt;1,000 page book is rarely appealing.
              On top of this, my day to day work is in the API space so I don't get to write much frontend code.
            </p>

            <h2>Tools &amp; Technologies</h2>
            <p><b>Frontend</b></p>
            <p>The frontend is built using <a href='https://reactjs.org/'>React</a> and <a href='https://remix.run/'>Remix</a>. I had read really positive things about Remix and wanted to try it out for myself. I didn't get too deep into the weeds
              but it was a really pleasant experience overall. <a href='https://mui.com/'>Material UI / MUI components </a> are used extensively. While these might lack originality in some cynical eyes, they were perfect for a small side project.
              If I tried to create those components myself (factoring in accessibility, design etc), it would take forever and I wouldn't do as good of a job. I definitely do not have a good eye for design so
              dropping in some well designed components was perfect for this project. The application is hosted on <a href='https://vercel.com/'>Vercel</a> as it is amazing, easy to use and has a great (free) "hobby" tier.
            </p>
          </Box>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '3em', flexWrap: 'wrap', padding: '2em' }}>
            <Images imageList={frontEndImages} />
          </Box>
        </Box>

        <Box sx={{ margin: '1em' }}>
          <Box>
            <p><b>Backend</b></p>
            <p>The backend is a very simple <a href='https://www.fastify.io/'>Fastify API</a>. The API doesn't do much except for some access key checking and connecting to / querying a database. The backend portion of this application lives on a <a href='https://www.raspberrypi.com/products/raspberry-pi-3-model-b/'>Raspberry Pi 3 Model B</a>. Obviously this solution lacks in the performance, security and reliability
              departments but it's free and it was fun to set up. The actual source of the data is a <a href='https://www.kaggle.com/mdhamani/goodreads-books-100k'>dataset</a> that I found on Kaggle. I wrote a Node.js script to parse the CSV file, normalize the data and store it in a <a href='https://www.postgresql.org/'>Postgres</a> database.
              I considered trying to get fancy and use an advanced COPY command / write a neat shell script but it just wasn't worth the effort (considering that I was trying to get this done over the Christmas holidays).
            </p>
          </Box>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '3em', flexWrap: 'wrap', padding: '2em' }}>
            <Images imageList={backEndImages} />
          </Box>
        </Box>
        <Box sx={{ margin: '1em' }}>
          <Box>
            <h2>To-Do (a.k.a. "Things I want to acknowledge but will likely never do")</h2>
            <ul>
              <li>
                Spend more than 5 minutes on a logo
              </li>
              <li>
                Write tests - I never write tests for half assed side projects as most of them don't see the light of day
              </li>
              <li>
                Refactor / reorganize the code. The route files are a bit bloated and some stuff could be moved to the components folder
              </li>
              <li>
                Rethink styling approach. Most of the page's styles are inline. This is not ideal but it was the quickest way for me to get where I wanted to be
              </li>              
              <li>
                Fix my SQL query - One tiny feature (showing the genre chips) is forcing me to run a subquery. It is increasing the query duration by over 100%
              </li> 
              <li>
                Buy a domain
              </li>                                                       
            </ul>
          </Box>
        </Box>        
      </main>
    </Box>
  )
}
