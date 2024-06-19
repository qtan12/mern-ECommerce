import React, { memo } from 'react';
 import { Editor } from '@tinymce/tinymce-react';

 const MarkdownEditor=({label, value, name, changeValue, invalidField, setInvalidField }) => {
   
   return (
     <div className='flex flex-col'>
        <span>{label}</span>
       <Editor
       apiKey='42sgnibe3d6c68ba1zfk6344ylvuqpxfe7vi9zsobvv3fdia'
         initialValue={value}
         init={{
           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
         onChange={e => changeValue(prev => ({...prev, [name]: e.target.getContent()})) }
        onFocus={() => setInvalidField && setInvalidField([])}
       />
       {invalidField?.some(el => el.name === name) && <small className='text-red-700 '>{invalidField?.find(el => el.name === name)?.message}</small>}

     </div>
   );
 }
 export default memo(MarkdownEditor)