export default function auth ({ next, router }) {
  if (!this.$store.user) {
    return router.push({ name: 'login' })
  }
  return next()
}
