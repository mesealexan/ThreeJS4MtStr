function setupGui(Assembly2Draw) {
effectController = {
EArmVO:0,
EArmRot:0,

PlateAHR:0,
PlateBHR:0,
PlateCHR:0,

ArmARot:0,
ArmBRot:0,
ArmCRot:0,

ArmADist:0,
ArmBDist:0,
ArmCDist:0,

mPipeA1H:0.35,
mPipeA1V:0,
mPipeA1R:0,
mPipeA2H:0,
mPipeA2V:0,
mPipeA2R:0,
mPipeA3H:-0.35,
mPipeA3V:0,
mPipeA3R:0,

mPipeB1H:0.35,
mPipeB1V:0,
mPipeB1R:0,
mPipeB2H:0,
mPipeB2V:0,
mPipeB2R:0,
mPipeB3H:-0.35,
mPipeB3V:0,
mPipeB3R:0,

mPipeC1H:0.35,
mPipeC1V:0,
mPipeC1R:0,
mPipeC2H:0,
mPipeC2V:0,
mPipeC2R:0,
mPipeC3H:-0.35,
mPipeC3V:0,
mPipeC3R:0

	};

	var gui = new dat.GUI();
	
	h = gui.addFolder("Mounting Structure");
	h.add(effectController, "EArmVO", -0.5, 0.5, 0.01).name("Extend Arm Vert Offset");
	h.add(effectController, "EArmRot", -89.0, 89.0, 0.025).name("Rotate Arms");
	
	a = gui.addFolder("A");
	a.add(effectController, "ArmADist", 0, 100, 0.01).name("Move Arm Hori");
	a.add(effectController, "ArmARot", -89.0, 89.0, 0.025).name("Rotate Arm");
	a.add(effectController, "PlateAHR", -89.0, 89.0, 0.025).name("Rotate Plate");
	a.add(effectController, "mPipeA1H", -0.5, 0.5, 0.01).name("mPipe 1 Horizontal");
	a.add(effectController, "mPipeA1V", -0.5, 0.5, 0.01).name("mPipe 1 Vertical");
	a.add(effectController, "mPipeA1R", -90.0, 90.0, 0.025).name("mPipe 1 Rot");
	a.add(effectController, "mPipeA2H", -0.5, 0.5, 0.01).name("mPipe 2 Horizontal");
	a.add(effectController, "mPipeA2V", -0.5, 0.5, 0.01).name("mPipe 2 Vertical");
	a.add(effectController, "mPipeA2R", -90.0, 90.0, 0.025).name("mPipe 2 Rot");
	a.add(effectController, "mPipeA3H", -0.5, 0.5, 0.01).name("mPipe 3 Horizontal");
	a.add(effectController, "mPipeA3V", -0.5, 0.5, 0.01).name("mPipe 3 Vertical");
	a.add(effectController, "mPipeA3R", -90.0, 90.0, 0.025).name("mPipe 3 Rot");
	
	b = gui.addFolder("B");
	b.add(effectController, "ArmBDist", 0, 100, 0.01).name("Move Arm Hori");
	b.add(effectController, "ArmBRot", -89.0, 89.0, 0.025).name("Rotate Arm");
	b.add(effectController, "PlateBHR", -89.0, 89.0, 0.025).name("Rotate Plate");
	b.add(effectController, "mPipeB1H", -0.5, 0.5, 0.01).name("mPipe 1 Horizontal");
	b.add(effectController, "mPipeB1V", -0.5, 0.5, 0.01).name("mPipe 1 Vertical");
	b.add(effectController, "mPipeB1R", -90.0, 90.0, 0.025).name("mPipe 1 Rot");
	b.add(effectController, "mPipeB2H", -0.5, 0.5, 0.01).name("mPipe 2 Horizontal");
	b.add(effectController, "mPipeB2V", -0.5, 0.5, 0.01).name("mPipe 2 Vertical");
	b.add(effectController, "mPipeB2R", -90.0, 90.0, 0.025).name("mPipe 2 Rot");
	b.add(effectController, "mPipeB3H", -0.5, 0.5, 0.01).name("mPipe 3 Horizontal");
	b.add(effectController, "mPipeB3V", -0.5, 0.5, 0.01).name("mPipe 3 Vertical");
	b.add(effectController, "mPipeB3R", -90.0, 90.0, 0.025).name("mPipe 3 Rot");

	c = gui.addFolder("C");
	c.add(effectController, "ArmCDist", 0, 100, 0.01).name("Move Arm Hori");
	c.add(effectController, "ArmCRot", -89.0, 89.0, 0.025).name("Rotate Arm");
	c.add(effectController, "PlateCHR", -89.0, 89.0, 0.025).name("Rotate Plate");
	c.add(effectController, "mPipeC1H", -0.5, 0.5, 0.01).name("mPipe 1 Horizontal");
	c.add(effectController, "mPipeC1V", -0.5, 0.5, 0.01).name("mPipe 1 Vertical");
	c.add(effectController, "mPipeC1R", -90.0, 90.0, 0.025).name("mPipe 1 Rot");
	c.add(effectController, "mPipeC2H", -0.5, 0.5, 0.01).name("mPipe 2 Horizontal");
	c.add(effectController, "mPipeC2V", -0.5, 0.5, 0.01).name("mPipe 2 Vertical");
	c.add(effectController, "mPipeC2R", -90.0, 90.0, 0.025).name("mPipe 2 Rot");
	c.add(effectController, "mPipeC3H", -0.5, 0.5, 0.01).name("mPipe 3 Horizontal");
	c.add(effectController, "mPipeC3V", -0.5, 0.5, 0.01).name("mPipe 3 Vertical");
	c.add(effectController, "mPipeC3R", -90.0, 90.0, 0.025).name("mPipe 3 Rot");
}