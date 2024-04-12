// export const dynamic = 'force-dynamic' // defaults to auto

import { fetcher } from '@/lib/utils'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const form = await request.formData()
  const file = form.get('file') as File

  const content = await file.text()
  return Response.json({ content })

  try {
    const json = JSON.parse(content)
    return Response.json({
      content:
        `poster_linkedin_url: ${json.data[0].poster_linkedin_url} \n` +
        json.data.map((item: any) => item.post_url).join('\n')
    })
  } catch (e) {
    return Response.json({ content })
  }
  // const content = (await file.text()).replace(/[\r\n]/g, ' ')
}

//  GET Linkedin Profile Posts using RapidAPI
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const profileUrl = searchParams.get('profileUrl')

  try {
    const response = await fetcher(
      `https://fresh-linkedin-profile-data.p.rapidapi.com/get-profile-posts?linkedin_url=${profileUrl}&type=posts`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY!
        }
      }
    )
    if (response.data.length > 0) {
      return Response.json({ data: response.data })
    } else {
      return NextResponse.json(
        { error: 'The user has posted nothing' },
        { status: 404 }
      )
    }
  } catch (error) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 })
  }
}
