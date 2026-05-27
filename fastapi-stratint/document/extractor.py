import fitz  # PyMuPDF
from docx import Document
import magic

class UnsupportedFileTypeError(Exception):
    pass

class EmptyDocumentError(Exception):
    pass

def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    mime = magic.from_buffer(file_bytes, mime=True)
    if filename.lower().endswith('.pdf') or mime == 'application/pdf':
        return extract_text_from_pdf(file_bytes)
    elif filename.lower().endswith('.docx') or mime == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return extract_text_from_docx(file_bytes)
    else:
        raise UnsupportedFileTypeError(f"Unsupported file type: {filename}")

def extract_text_from_pdf(file_bytes: bytes) -> str:
    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        text = "\n".join(page.get_text() for page in doc)
    if not text.strip():
        raise EmptyDocumentError("PDF document is empty.")
    return text

def extract_text_from_docx(file_bytes: bytes) -> str:
    from io import BytesIO
    doc = Document(BytesIO(file_bytes))
    text = "\n".join([p.text for p in doc.paragraphs])
    if not text.strip():
        raise EmptyDocumentError("DOCX document is empty.")
    return text
