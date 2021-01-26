import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks';
import AuthContext from '../context/AuthContext';
import { Loader, LinkCard } from '../components';

const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const { request, loading } = useHttp();
  const getLink = useCallback(async () => {
    try {
      const fetchedLink = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetchedLink);
    } catch (e) {}
  }, [token, linkId, request]);
  useEffect(() => {
    getLink();
  }, [getLink]);
  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};

export default DetailPage;
