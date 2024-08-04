
import { MainLHP, Menu } from '../components'

type Props = {}

export default function ResultLHP({}: Props) {
  return (
    <div className="flex">
        <div className="flex w-[400px]"><Menu/></div>
        <div className="flex h-screen w-screen "><MainLHP/></div>

        </div>

  )
}