import React, { useState } from 'react';

const ContentManagement = () => {
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [data, setData] = useState([
    { contentType: 'Blog', title: 'Blog Title 1', status: 'Published', publishedDate: '2023-01-01', author: 'Author 1', approver: 'Approver 1', totalViews: 1000, totalLikes: 200, totalComments: 50, action: 'Unpublish' },
    { contentType: 'Workout Video', title: 'Video Title 2', status: 'Pending', publishedDate: '-', author: 'Author 2', approver: '-', totalViews: 500, totalLikes: 100, totalComments: 25, action: 'Publish' },
    { contentType: 'Awareness Video', title: 'Video Title 3', status: 'Approved', publishedDate: '2023-02-15', author: 'Author 3', approver: 'Approver 2', totalViews: 1500, totalLikes: 300, totalComments: 75, action: 'Publish' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  const handleAction = (index, action) => {
    const newData = [...data];
    newData[index].status = action === 'Publish' ? 'Published' : 'Unpublished';
    newData[index].action = action === 'Publish' ? 'Unpublish' : 'Publish';
    setData(newData);
  };

   // Get current items
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
 
   // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* <h1 className="text-3xl font-bold mb-4">Content Management</h1> */}
      <div className="mb-4">
        <label htmlFor="contentType" className="mr-2">Filter by Content Type:</label>
        <select id="contentType" className="select select-bordered select-sm max-w-xs">
          <option value="all">All</option>
          <option value="blog">Blog</option>
          <option value="workoutVideo">Workout Video</option>
          <option value="awarenessVideo">Awareness Video</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {['Content Type', 'Title', 'Status', 'Published Date', 'Author', 'Approver', 'Total Views', 'Total Likes', 'Total Comments', 'Actions'].map((header) => (
                <th key={header} onClick={() => handleSort(header.toLowerCase().replace(' ', ''))} className="cursor-pointer">
                  {header}
                  {sortColumn === header.toLowerCase().replace(' ', '') && (
                    <span className="ml-1">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.contentType}</td>
                <td>{row.title}</td>
                <td>{row.status}</td>
                <td>{row.publishedDate}</td>
                <td>{row.author}</td>
                <td>{row.approver}</td>
                <td>{row.totalViews}</td>
                <td>{row.totalLikes}</td>
                <td>{row.totalComments}</td>
                <td>
                  <button 
                    className={`btn btn-sm ${row.action === 'Publish' ? 'btn-accent' : 'btn-secondary'}`}
                    onClick={() => handleAction(index, row.action)}
                  >
                    {row.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <div className="btn-group">
          {[...Array(Math.ceil(data.length / itemsPerPage))].map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${currentPage === index + 1 ? 'btn-active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;