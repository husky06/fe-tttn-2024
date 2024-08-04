
import { MainResult, Menu } from '../components'

type Props = {}

export default function Year({}: Props) {
  return (
    <div className="flex">
        <div className="flex w-[400px]"><Menu/></div>
        <div className="flex h-screen w-screen "><MainResult/></div>

        </div>

  )
}