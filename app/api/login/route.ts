import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Admin login
  if (email === "admin@hospital.com" && password === "admin123") {
    return NextResponse.json({
      success: true,
      user: {
        id: "U001",
        name: "Admin User",
        email: "admin@hospital.com",
        role: "Admin",
      },
      token: "mock-jwt-token-admin-12345",
    });
  }

  // Patient login credentials
  const patientCredentials: Record<string, { name: string; id: string; role: string }> = {
    "patient@hospital.com": { name: "John Smith", id: "P001", role: "Patient" },
    "john.smith@email.com": { name: "John Smith", id: "P001", role: "Patient" },
    "emily.j@email.com": { name: "Emily Johnson", id: "P002", role: "Patient" },
    "patient2@hospital.com": { name: "Emily Johnson", id: "P002", role: "Patient" },
  };

  const patientData = patientCredentials[email];
  if (patientData && password === "patient123") {
    return NextResponse.json({
      success: true,
      user: {
        id: patientData.id,
        name: patientData.name,
        email: email,
        role: patientData.role,
      },
      token: "mock-jwt-token-patient-" + patientData.id,
    });
  }

  return NextResponse.json(
    { success: false, message: "Invalid email or password" },
    { status: 401 }
  );
}
