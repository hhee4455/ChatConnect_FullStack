import logo from "./logo.svg";
import "./App.css";
import { useState } from "react"; //state 함수

function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            // 경고창 나오게 하는 부분
            event.preventDefault();
            props.onChangeMode(Number(event.target.id)); //id 값이 필요하므로 id를 넣어주고 <a></a> 부분에 {t.id}
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  // 컴포넌트
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article(props) {
  //props..?
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  //create 컴포넌트 만들기
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
          // event.target = form이다.
        }}
      >
        {/*form 태그 어떤 정보를 서버로 전송할때 쓴다. 
          onSubmit  submit 버튼을 눌렀을 때 폼 태그에서 발생하는 이벤트*/}
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body" />
        </p>
        <p>
          <input type="submit" value="Create" /> {/*전송버튼*/}
        </p>
      </form>
    </article>
  );
}

function App() {
  // const _mode = useState("WELCOME");   //state 부분
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState("Welcome"); // 위 세줄 요약한거
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ... " },
    { id: 2, title: "css", body: "css is ... " },
    { id: 3, title: "javascript", body: "javascript is ... " },
  ]);
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcom" body="Hello, WEB"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      //html, css, js 클릭시 title,body 출력
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics]; //
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  }
  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setId(_id);
          //alert(id); //경고장으로 나오는 부분
        }}
      ></Nav>
      {content}
      <a
        href="/create"
        onClick={(event) => {
          //Create 생성
          event.preventDefault(); //a태그의 기본적인 동작을 못하게 하기 위해서
          setMode("CREATE"); //App 다시 동작
        }}
      >
        Create
      </a>
    </div>
  );
}

export default App;
