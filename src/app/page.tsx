import { getCurrentSession } from "@/actions/auth"

const Home = async () => {
  const { user } = await getCurrentSession()

  return <div>{JSON.stringify(user, null, 2)}</div>
}

export default Home
