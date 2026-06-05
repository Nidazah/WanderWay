from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import string
import asyncio

app = FastAPI(title="WanderWay Booking API")

# Configure CORS to allow your frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with ["http://127.0.0.1:5500", "http://localhost:8000"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for request validation
class BookingRequest(BaseModel):
    fullName: str
    email: str
    packageName: str
    travelers: int
    departDate: str
    specialRequests: str = ""
    totalCost: str

# In-memory "database"
bookings_db = []

@app.post("/api/bookings")
async def create_booking(booking: BookingRequest):
    # Simulate network/processing delay for a realistic loading state
    await asyncio.sleep(0.8)
    
    # Generate unique reference ID
    booking_ref = "TRV-" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    
    # Save to database
    booking_data = booking.dict()
    booking_data["bookingRef"] = booking_ref
    booking_data["status"] = "Confirmed"
    bookings_db.append(booking_data)
    
    print(f"New Booking Received: {booking_data}")
    
    return {"message": "Booking successfully processed", "bookingRef": booking_ref}

@app.get("/api/bookings")
async def get_bookings():
    return {"bookings": bookings_db}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
