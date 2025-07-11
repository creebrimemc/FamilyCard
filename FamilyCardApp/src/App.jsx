
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Users, CreditCard, Lock, Home, Info, Star } from "lucide-react";
import { motion } from "framer-motion";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4GdsdUkmdT3NxXQT1jYEPxMwMr7URiDI",
  authDomain: "familycard-64ceb.firebaseapp.com",
  projectId: "familycard-64ceb",
  storageBucket: "familycard-64ceb.firebasestorage.app",
  messagingSenderId: "896814270182",
  appId: "1:896814270182:web:ada044e2dc38114c095d27",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function FamilyCardApp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    try {
      if (user) {
        alert("Already logged in");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in");
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created and logged in");
      } else {
        alert(error.message);
      }
    }
  };

  const renderPage = () => {
    if (!user) {
      return (
        <main className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="rounded-2xl shadow-md p-6">
              <CardContent className="space-y-4">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Lock /> Login / Register
                </h2>
                <Input 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="w-full mt-2" onClick={handleAuth}>Login or Register</Button>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      );
    }
    if (page === "about") {
      return (
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About FamilyCard</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            FamilyCard helps your family stay connected and financially organized. With shared cards, spending limits, and member roles, it's the perfect tool for modern households.
          </p>
        </div>
      );
    }
    if (page === "features") {
      return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-2xl shadow-md p-6">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Secure Login</h3>
              <p>One login for the whole family, with role-based access and strong authentication.</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md p-6">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Card & Wallet</h3>
              <p>Manage family cards, check balance, and track spending instantly.</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-md p-6">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">Family Roles</h3>
              <p>Assign parent, teen, or child roles with spending permissions and visibility.</p>
            </CardContent>
          </Card>
        </div>
      );
    }
    return (
      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="rounded-2xl shadow-md p-6">
            <CardContent className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <CreditCard /> Money & Cards
              </h2>
              <p>View balances, manage transactions, and control shared family cards.</p>
              <ul className="text-sm space-y-1">
                <li>• Balance: $3,420</li>
                <li>• Last transaction: Grocery - $52</li>
                <li>• Shared Card: Enabled</li>
              </ul>
              <Button className="w-full mt-2">Open Wallet</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Card className="rounded-2xl shadow-md p-6">
            <CardContent className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Users /> Family Members
              </h2>
              <ul className="text-sm space-y-1">
                <li>• Alice (Parent)</li>
                <li>• Bob (Teen - Limit $100/mo)</li>
                <li>• Charlie (Child - View Only)</li>
              </ul>
              <Button className="w-full mt-2">Manage Members</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <Card className="rounded-2xl shadow-md p-6">
            <CardContent className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <CheckCircle /> Budgets & Limits
              </h2>
              <p>Set monthly spending limits and view how the family is doing in real-time.</p>
              <ul className="text-sm space-y-1">
                <li>• Total Budget: $2,000</li>
                <li>• Spent This Month: $1,175</li>
                <li>• Remaining: $825</li>
              </ul>
              <Button className="w-full mt-2">Adjust Budget</Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} p-6`}>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">FamilyCard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A secure family wallet for managing cards, money, and members.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" onClick={toggleTheme}>Toggle {isDark ? "Light" : "Dark"} Mode</Button>
          <Button variant="outline" onClick={() => setPage("home")}><Home className="w-4 h-4 mr-2" /> Home</Button>
          <Button variant="outline" onClick={() => setPage("about")}><Info className="w-4 h-4 mr-2" /> About</Button>
          <Button variant="outline" onClick={() => setPage("features")}><Star className="w-4 h-4 mr-2" /> Features</Button>
        </div>
      </header>

      {renderPage()}

      <footer className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} FamilyCard. All rights reserved.
      </footer>
    </div>
  );
}
