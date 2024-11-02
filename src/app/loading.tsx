'use client';
import { CenterLayout } from '@/components';
import React from 'react';

const Loading = React.memo(() => {
  return (
    <>
      <CenterLayout
        Element={`section`}
        className={`
					flex flex-col justify-center
					items-center h-screen w-screen
					overflow-hidden  top-0
					left-0 bottom-0 right-0 z-50
        `}
      >
        <div className="w-10 h-10 text-xs font-medium text-center text-white bg-black border-2 border-white rounded-full dark:border-gray-800 dark:bg-white dark:text-black" />
      </CenterLayout>
    </>
  );
});
export default Loading;
