export async function startOcrJob(jobId: string, imageUrl: string) {
  const res = await fetch("http://localhost:5000/ocr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job_id: jobId, image_url: imageUrl })
  });
  return res.json();
}

export async function getOcrJob(jobId: string) {
  const res = await fetch(`http://localhost:3000/jobs/${jobId}`);
  return res.json();
}
