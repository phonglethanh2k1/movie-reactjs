import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
  const { query } = useParams();
  const endpoint = "GP11";
  const url = `${endpoint}`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(url).then((res) => {
      setData(res.content);
      setSearchResults(filterResults(res.content));
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(url).then((res) => {
      if (res?.content) {
        setData({
          ...data,
          results: [...data?.results, ...res?.content],
        });
        setSearchResults(filterResults([...data?.results, ...res?.content]));
      } else {
        setData(res);
        setSearchResults(filterResults(res));
      }
    });
  };

  const filterResults = (results) => {
    return results.filter((item) =>
      item.tenPhim.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    fetchInitialData();
  }, [url, query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {searchResults.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  searchResults?.length > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={searchResults?.length || []}
                next={fetchNextPageData}
                // hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {searchResults.map((item, index) => (
                  <MovieCard key={index} data={item} />
                ))}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
