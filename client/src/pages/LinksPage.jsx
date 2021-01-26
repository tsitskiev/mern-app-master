import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useHttp } from '../hooks';
import AuthContext from '../context/AuthContext';
import { Loader, LinksList } from '../components';

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const removeLink = async (idToRemove) => {
    if (window.confirm('Do you really want to delete this link?')) {
      await request(
        'api/link/remove',
        'POST',
        { idToRemove },
        {
          Authorization: `Bearer ${token}`,
        },
      );
      fetchLinks();
    }
  };

  const fetchLinks = useCallback(async () => {
    try {
      const fetchedLinks = await request('api/link', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetchedLinks.links);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && <LinksList links={links} onRemoveLink={removeLink} />}</>;
};

export default LinksPage;
