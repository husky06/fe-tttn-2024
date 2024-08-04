
import { CreateModule, Menu } from '../components'

type Props = {}

export default function CreateClass({}: Props) {
  return (
    <div className="flex">
        <div className="flex w-[400px]"><Menu/></div>
        <div className="flex h-screen w-screen "><CreateModule/></div>

        </div>

  )
}