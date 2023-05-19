import  { useState, useEffect } from 'react'

export const useDebounce = (value, delay ) => {
   // value를 받아와서 delay를 주고 전달해줌.
   // value : 사용자가 타이핑한 값
  const [debounceValue, SetDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      SetDebounceValue(value)
    }, delay)

    return () => { 
      // 딜레이가 걸려있는 중이라면 기존 값은 없어져야 되고 새로 들어온 값으로 갱신되어야 하니까
      clearTimeout(handler)
    }
  }, [value, delay]); // 값이 바뀌면 리콜이 되어 함수가 다시 실행됨. -> 딜레이 다시 걸게 되는거쥬

  return debounceValue
}


