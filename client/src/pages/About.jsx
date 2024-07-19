
export default function About() {
  return (
    <section className='pt-16 min-h-screen dark:bg-[#2B2D42] dark:text-white'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
        <h1 className='text-3xl font font-semibold text-center my-7'>
          About Elias's Blog
        </h1>
        <div className='text-md text-gray-500 flex flex-col gap-6'>
          <p>
            Welcome to Elias's Blog! This blog was created by Elias Dewa
            as a personal project to share his thoughts and ideas with the
            world. Elias is a passionate developer who loves to write about
            technology, coding, and everything in between.
          </p>

          <p>
            On this blog, you'll find weekly articles and tutorials on topics
            such as web development, software engineering, and programming
            languages. Elias is always learning and exploring new
            technologies, so be sure to check back often for new content!
          </p>

          <p>
            We encourage you to leave comments on our posts and engage with
            other readers. You can like other people comments and reply to
            them as well. We believe that a community of learners can help
            each other grow and improve.
          </p>
        </div>
      </div>
    </section>
  );
}
