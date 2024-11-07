import './App.css';
import ArticleCard from './components/articleCard';
import ArticlesList from './components/articlesList';
import { CommentHeader } from './components/commentsHeader/commentsHeader';
import { CommentList } from './components/commentsList/commentList';
import { Header } from './components/header/header';
import { useMain } from './hooks/useMain';

function App() {
  const {
    status,
    articles,
    setActiveArticle,
    activArticle,
    activeArticleData,
    getArticle,
    submitComment,
    getCommentsMain,
    mainComments,
    user,
    changeFilter,
  } = useMain();

  return (
    <div className='mainWrapper'>
      <Header
        action={() => {
          setActiveArticle(-1);
        }}
        userName={user.name}
        activeArticle={activArticle}
      />
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : activArticle > -1 ? (
        <ArticleCard
          data={activeArticleData}
          action={() => {
            getArticle(activArticle);
            getCommentsMain(activArticle);
          }}
          submitComment={submitComment}
        >
          <>
            <CommentHeader
              filter={mainComments.filter}
              changeFilter={changeFilter}
            />
            <CommentList data={mainComments.comments} />
          </>
        </ArticleCard>
      ) : (
        <ArticlesList
          data={articles}
          action={setActiveArticle}
        />
      )}
    </div>
  );
}

export default App;
