function formatAuthors(authorsList = []) {
  return authorsList.map(author => {
    const parts = author.trim().split(' ');
    const lastName = parts.pop();
    const firstInitial = parts.length > 0 ? parts[0][0] + '.' : '';
    return `${firstInitial} ${lastName}`;
  }).join(', ');
}

function formatIEEEDate(dateStr) {
  if (!dateStr) return '';
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  const date = new Date(dateStr);
  if (isNaN(date)) return '';
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function convertToIEEEFormat(publications = []) {
  return publications.map(pub => {
    const formattedAuthors = formatAuthors(pub.pAuthors || []);
    const formattedDate = formatIEEEDate(pub.pDate || pub.dateFrom);
    const fallbackYear = pub.pYear || (formattedDate ? formattedDate.split(' ')[1] : '');

    let citation = '';

    // === Journal Format ===
    if (pub.pType === 'Journal') {
      citation = `${formattedAuthors}, "${pub.pTitle}", ${pub.journalName || '-'}`;
      if (pub.publisherName) citation += ` (${pub.publisherName})`;
      if (pub.volume) citation += `, vol. ${pub.volume}`;
      if (pub.page) citation += `, pp. ${pub.page}`;
      citation += `, ${fallbackYear}.`;
      if (pub.impactFactor) citation += ` Impact Factor: ${pub.impactFactor}.`;
      // if (pub.doiLink) citation += ` DOI: ${pub.doiLink}`;
    }


    // === Book Chapter Format ===
    else if (pub.pType === 'Book-Chapter') {
      citation = `${formattedAuthors}, "${pub.pTitle}", in ${pub.pType || '-'}, ${pub.bookPublisher || '-'}, ${fallbackYear}, ISBN: ${pub.issn || '-'}.`;
      if (pub.doiLink) citation += ` DOI: ${pub.doiLink}`;
    }

    // === Conference Format (your original logic) ===
    else if (pub.pType === 'Conference') {
      const venue = pub.pVenue || pub.conferenceName || '';
      citation = `${formattedAuthors}, "${pub.pTitle}", ${venue ? venue + ', ' : ''}${formattedDate ? formattedDate : pub.pYear}.`;
    }

    // === Fallback for any unknown type ===
    else {
      const venue = pub.pVenue || pub.journalName || pub.conferenceName || '';
      citation = `${formattedAuthors}, “${pub.pTitle}”, ${venue ? venue + ', ' : ''}${formattedDate ? formattedDate : fallbackYear}.`;
    }

    return {
      pType: pub.pType,
      pYear: pub.pYear,
      doiLink: pub.doiLink || '',
      ieeeCitation: citation
    };
  });
}

export { convertToIEEEFormat };
