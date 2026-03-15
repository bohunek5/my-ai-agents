---
name: youtube-scraper
description: A complete pipeline for fetching video metadata, downloading transcripts, parsing structured data, and pulling comments from YouTube. Supports search chunking and RAG-ready timestamp URLs.
---

# 🎬 YouTube Scraper (Pipeline Expert)

This skill provides a comprehensive guide and logical framework for building reliable YouTube scraping pipelines. It is designed to work as part of the `Antigravity` + `Roo Code` ecosystem, utilizing external tools like `yt-dlp` and `n8n` for maximum efficiency.

## 🛠️ CAPABILITIES

1. **Metadata Extraction**: Fetch all videos from a channel using YouTube Data API v3 (Titles, Descriptions, Stats, Tags).
2. **Transcript Processing**: Automate transcript downloads via `yt-dlp` and parse VTT files into structured JSON.
3. **Search Optimization**: Chunking long transcripts (500 words with 75-word overlap) for vector embeddings and search.
4. **Comment Extraction**: Scrape top-level comments and threads for sentiment analysis or community research.
5. **Analytics Integration**: OAuth-based access to watch time, CTR, and traffic source breakdown.

## 🗺️ PIPELINE STAGES

| Stage | Action | Tools |
| :--- | :--- | :--- |
| **1** | Fetch Videos | YouTube Data API v3 |
| **2** | Transcripts | `yt-dlp` CLI |
| **3** | Chunking | Custom JS/Python logic |
| **4** | Comments | YouTube Data API v3 |

## ⚙️ TECHNICAL SETUP

### Requirements

- **Runtime**: Node.js 20+ or Python 3.10+
- **Tools**: `yt-dlp`, `ffmpeg`
- **Auth**: YouTube Data API v3 Key (for metadata) / OAuth Client ID (for analytics)

### Optimization ( Mazury Holiday Rule)

- Use **WebP** for any thumbnails extracted.
- Store results in structured formats (SQLite, JSON, or CSV).

## 🧩 DATA SCHEMA (Reference)

- `video_id`: Primary Key
- `transcript`: Full concatenated text
- `timestamp_url`: Deep-link for RAG citations (`https://youtube.com/watch?v=ID&t=Xs`)
- `stats`: {views, likes, comments}

## 🛡️ GUIDELINES

1. **Idempotent Execution**: Always check if a video/transcript is already processed before downloading.
2. **Delta Scraping**: Only fetch new videos; refresh stats for old ones.
3. **Graceful Degradation**: Handle disabled comments or missing subtitles without crashing the pipeline.
4. **Quota Friendly**: Batches of 50 for API calls to stay within free tier (10k units).

---
*Note: This skill is the documentation for the "machina" that manages YouTube data extraction. Use `automation-architect` to implement specific n8n workflows based on this logic.*
