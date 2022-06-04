const mysql = require('mysql')
const util = require('util')

async function main () {
  try {
    const pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      port:3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    })

    console.log(process.env.DB_HOST)
    console.log(process.env.DB_USER)
    console.log(process.env.DB_PASS)
    console.log(process.env.DB_NAME)

    pool.query = util.promisify(pool.query)

    const createPublicationsTable = 'CREATE TABLE `publications` (`name` VARCHAR(255),`avatar` VARCHAR(255));'

    await pool.query(createPublicationsTable)

    const publicationsQuery = 'INSERT INTO publications (name, avatar) VALUES ?'
    const publicationsValues = [
      ['The Daily Reviewer', 'glyphicon-eye-open'],
      ['International Movie Critic', 'glyphicon-fire'],
      ['MoviesNow', 'glyphicon-time'],
      ['MyNextReview', 'glyphicon-record'],
      ['Movies n\' Games', 'glyphicon-heart-empty'],
      ['TheOne', 'glyphicon-globe'],
      ['ComicBookHero.com', 'glyphicon-flash']
    ]
    await pool.query(publicationsQuery, [publicationsValues])

    const createReviewersTable = 'CREATE TABLE `reviewers` (`name` VARCHAR(255),`publication` VARCHAR(255),`avatar` VARCHAR(255));'

    await pool.query(createReviewersTable)

    const reviewersQuery = 'INSERT INTO reviewers (name, publication, avatar) VALUES ?'
    const reviewersValues = [
      ['Robert Smith', 'The Daily Reviewer', 'https://img.wattpad.com/useravatar/sacullem.128.897966.jpg'],
      ['Chris Harris', 'International Movie Critic', 'https://cachedimages.podchaser.com/256x256/aHR0cHM6Ly9jcmVhdG9yLWltYWdlcy5wb2RjaGFzZXIuY29tL2M5ZGFjZjljMTIyNjk0MDFhOGJhMzFmNmRiOGI5NDcxLnBuZw%3D%3D/aHR0cHM6Ly93d3cucG9kY2hhc2VyLmNvbS9pbWFnZXMvbWlzc2luZy1pbWFnZS5wbmc%3D'],
      ['Janet Garcia', 'MoviesNow', 'https://th.bing.com/th/id/OIP.LqyTMeVJuc6wlE-iP-2T6AAAAA?pid=ImgDet&rs=1'],
      ['Andrew West', 'MyNextReview', 'https://static.wikia.nocookie.net/deadofsummerfreeform/images/c/c0/Andrew_J._West.png'],
      ['Mindy Lee', 'Movies n\' Games', 'https://th.bing.com/th/id/OIP.UHXvgDMC8LnAX-fLd50sMAAAAA?pid=ImgDet&w=143.25259515570934&h=180&c=7'],
      ['Martin Thomas', 'TheOne', 'https://lh3.googleusercontent.com/-o7G2uoShpEw/YX44nOdtCTI/AAAAAAAAo3E/wox3Mbe2Nloj5MWmKvAGGgN_nj6_AtBSQCNcBGAsYHQ/w700/image.png'],
      ['Anthony Miller', 'ComicBookHero.com', 'https://madden-assets-cdn.pulse.ea.com/madden21/portraits/256/8992.png']
    ]
    await pool.query(reviewersQuery, [reviewersValues])

    const createMoviesTable = 'CREATE TABLE `movies` (`title` VARCHAR(255),`release_year` VARCHAR(255),`score` VARCHAR(255), `reviewer` VARCHAR(255),`publication` VARCHAR(255));'

    await pool.query(createMoviesTable)

    const moviesQuery = 'INSERT INTO movies (title, release_year, score, reviewer, publication) VALUES ?'
    const moviesValues = [
      ['Suicide Squad', '2016', 8, 'Robert Smith', 'The Daily Reviewer'],
      ['Batman vs. Superman', '2016', 6, 'Chris Harris', 'International Movie Critic'],
      ['Captain America: Civil War', '2016', 9, 'Janet Garcia', 'MoviesNow'],
      ['Deadpool', '2016', 9, 'Andrew West', 'MyNextReview'],
      ['Avengers: Age of Ultron', '2015', 7, 'Mindy Lee', 'Movies n\' Games'],
      ['Ant-Man', '2015', 8, 'Martin Thomas', 'TheOne'],
      ['Guardians of the Galaxy', '2014', 10, 'Anthony Miller', 'ComicBookHero.com'],
      ['Doctor Strange', '2016', 7, 'Anthony Miller', 'ComicBookHero.com'],
      ['Superman: Homecoming', '2017', 10, 'Chris Harris', 'International Movie Critic'],
      ['Wonder Woman', '2017', 8, 'Martin Thomas', 'TheOne']
    ]
    await pool.query(moviesQuery, [moviesValues])

    console.log('Seeds succesfully executed')
    process.exit(0)
  } catch (err) {
    console.error('Seeds file error:', err)
    process.exit(1)
  }
}

main()