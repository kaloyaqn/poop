import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Avatar({ url, size, onUpload, hasUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full border-[2px] border-[#5B3410]"
          style={{ height: size, width: size }}
        />
      ) : (
        <img width={size} src='https://zyuebxkjnotchjumbrqq.supabase.co/storage/v1/object/sign/avatars/no-pfp.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL25vLXBmcC5wbmciLCJpYXQiOjE3MDQ4ODM5NjQsImV4cCI6MzE3MDMzMzQ3OTY0fQ.m3t5h0_kZISDTN2EY0FSfpofpDhSgx0f73cocYGkFNA&t=2024-01-10T10%3A52%3A44.689Z' alt='Няма синмка'/>
      )}
    {hasUpload && (
              <div style={{ width: size }}>
              <label className="button primary block" htmlFor="single">
                {uploading ? 'Uploading ...' : 'Upload'}
              </label>
              <input
                style={{
                  visibility: 'hidden',
                  position: 'absolute',
                }}
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </div>
    )}
    </div>
  )
}