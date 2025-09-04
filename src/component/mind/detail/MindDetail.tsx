"use client"
interface Props {
  id: number;
}

export default function MindDetail ({id}: Props) {
    return (
      <div>
        <ul>
          <li>
            <button>뒤로가기</button>
            <title></title>
          </li>
        </ul>
        <h4>{id}</h4>
      </div>
    )
}