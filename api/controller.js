let controllerState = {
  fanEnabled: false,
  turnerEnabled: false
};

export default function handler(req, res) {
  if (req.method === "POST") {
    controllerState = { ...controllerState, ...req.body };
    return res.status(200).json({ success: true });
  }

  res.status(200).json(controllerState);
}
