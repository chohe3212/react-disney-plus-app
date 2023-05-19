import {useEffect} from "react"

export default function useOnClickOutside (ref, handler) {
  useEffect(() => {
    // 모달창 밖을 클릭하면 Callback 함수를 호출하는 Event 등록해주기.
    const listner = (event) => {
      // 해당 타겟이 컨테이너에 포함이 되어있으면 그냥 아무것도 없게
      if (!ref.current || ref.current.contains(event.target)){ return;}
      handler(event);
    };
    document.addEventListener("mousedown", listner); // 클릭됐을때 이벤트 실행하기
    document.addEventListener("touchstart", listner); // 터치됐을때 이벤트 실행하기.
    return () => {
      document.removeEventListener("mousedown", listner); // 사용하지 않을때 이벤트 지우기
      document.removeEventListener("touchstart", listner); 
    }
  },[ref,handler])
}